import React from 'react'
import { useState } from 'react'
import { useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createSpot } from '../../../store/spots';

import states from '../../utils/statesArr'

export const FormInput = ({ name, state, setState }) => {
    const formatName = name.toLowerCase().split(' ').join('-');

    return (
      <div className='form-input'>
        <label htmlFor={formatName}>{name}</label>
        <input id={formatName} placeholder={name} name={formatName} value={state} onChange={e => setState(e.target.value)} />
      </div>
    )
}

export const FormTextarea = ({ name, state, setState }) => {
    const formatName = name.toLowerCase().split(' ').join('-');

    return (
        <div className='form-input'>
            <label htmlFor={formatName}>{name}</label>
            <textarea id={formatName} placeholder={name} value={state} onChange={e => setState(e.target.value)} required/>
        </div>
    )
}



const SpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory()
    const [errors, setErrors] = useState([]);

    const user_id = useSelector(state => state?.session?.user?.id)


    const [spot_name, setSpot_name] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('AL');
    const [price, setPrice] = useState('');
    const [guest_limit, setGuest_limit] = useState('');
    // const [image, setImage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('user_id', user_id);
        formData.append('spot_name', spot_name);
        formData.append('description', description);
        formData.append('address', address);
        formData.append('city', city);
        formData.append('state', state);
        formData.append('price', price);
        formData.append('guest_limit', guest_limit);



        const newSpot = await dispatch(createSpot(formData)).catch(
            (async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            })
        )

        // if (newSpot?.errors) setErrors(newSpot?.errors)
        if (newSpot?.id) {
            return history.push(`/spots/${newSpot?.id}`)
        }
        return 'Failed to create spot'
    }


    return (
        <div className="form_div">
            <form className="spot_form" onSubmit={handleSubmit}>
                <FormInput name='Spot name' state={spot_name}  setState={setSpot_name} isRequired={true} />
                <FormTextarea name='description' state={description} setState={setDescription} isRequired={true} />
                <FormInput name='address' state={address} setState={setAddress} isRequired={true}/>
                <FormInput name='city' state={city} setState={setCity} isRequired={true} />

                <div>
                    <label htmlFor="state">state</label>
                    <select name="state" value={state} onChange={e => setState(e.target.value)}>
                        {states.map((state) => <option value={state}>{state}</option>)}
                    </select>
                </div>

                <div>
                    <label htmlFor="price">price</label>
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="guest_limit">max guests</label>
                    <input type="number" value={guest_limit} onChange={e => setGuest_limit(e.target.value)} />
                </div>

                {/* <FormInput name='image' state={image} setState={setImage} isRequired={false} /> */}



                {/* <div>
                    <input type="file" name='image_upload' id='image_upload_input' accept='image/*'  />
                </div> */}

                <div>
                    <button className='new_spot_btn' type='submit'>submit</button>
                </div>
            </form>

            <div>
                {errors.map((error, ind) => (
                <div className='errors' key={ind}>{error}</div>
                ))}
            </div>
        </div>
    )
}

export default SpotForm
