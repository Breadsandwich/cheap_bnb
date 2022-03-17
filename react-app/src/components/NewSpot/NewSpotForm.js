import states from '../../components/utils/statesArr'

const SpotForm = () => {

    return (
        <div className="form_div">
            <form className="spot_form">
                <div>
                    <input type="text" placeholder="name your spot" />
                </div>

                <div>
                    <textarea className="textarea" cols="50" rows="5" placeholder="Give me a description of your spot."></textarea>
                </div>

                <div>
                    <input type="text" placeholder="address" />
                </div>

                <div>
                    <input type="text" placeholder="city"/>
                </div>


                <div>
                    <select name="state" >
                        {states.map((state) => <option value={state}>{state}</option>)}
                    </select>

                </div>


                <div>
                    <input type="number" placeholder="price per day"/>
                </div>


                <div>
                    <input type="number" placeholder="guest limit"/>
                </div>

                <button>upload photos modal</button>
            </form>
        </div>
    )
}

export default SpotForm
