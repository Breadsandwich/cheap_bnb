import React from 'react'
import { useState } from 'react'
import { useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createSpot, updateSpot } from '../../../store/spots';
import { getCookie } from '../../../utils/cookies';

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



const SpotForm = ({ name, edit, spot, closeModal}) => {
    const dispatch = useDispatch();
    const history = useHistory()

    const user_id = useSelector(state => state?.session?.user?.id)


    const [errors, setErrors] = useState([]);
    const [spot_name, setSpot_name] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('AL');
    const [price, setPrice] = useState('');
    const [guest_limit, setGuest_limit] = useState('');
    const [image_url, setImage_url] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Get CSRF token from cookies
        const csrfToken = getCookie('csrf_token');
        if (csrfToken) {
            formData.append('csrf_token', csrfToken);
        }

        formData.append('user_id', user_id);
        formData.append('spot_name', spot_name);
        formData.append('description', description);
        formData.append('address', address);
        formData.append('city', city);
        formData.append('state', state);
        formData.append('price', price);
        formData.append('guest_limit', guest_limit);
        formData.append('image_url', image_url);

        if (edit) {
            const updatedSpot = await dispatch(updateSpot(formData, spot?.id))
            if (updatedSpot?.errors) setErrors(updatedSpot?.errors);
            if (updatedSpot?.id) {
                history.push(`/spots/${spot?.id}`)
                return closeModal();
            }
            return 'update Failed'
        }

        const newSpot = await dispatch(createSpot(formData))
        if (newSpot?.errors) setErrors(newSpot?.errors)
        if (newSpot?.id) {
            return history.push(`/spots/${newSpot?.id}`);

        }
        return 'failed to create new spot'
    }

    const updateImage_url = (e) => {
        const file = e.target.files[ 0 ];
        setImage_url(file);
    }


    return (
        <div className="form_div">
            <div>
                {errors.map((error, ind) => (
                <div className='errors' key={ind}>{error}</div>
                ))}
            </div>

            <div className='spot_form_div'>
            <form className="spot_form" onSubmit={handleSubmit}>
                <FormInput name='Spot name' state={spot_name}  setState={setSpot_name} />
                <FormTextarea name='description' state={description} setState={setDescription} />
                <FormInput name='address' state={address} setState={setAddress}/>
                <FormInput name='city' state={city} setState={setCity} />

                <div className='form-input'>
                    <label htmlFor="state">state</label>
                    <select name="state" value={state} onChange={e => setState(e.target.value)}>
                        {states.map((state) => <option value={state}>{state}</option>)}
                    </select>
                </div>

                <div className='form-input'>
                    <label htmlFor="price">price</label>
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
                </div>

                <div className='form-input'>
                    <label htmlFor="guest_limit">max guests</label>
                    <input type="number" value={guest_limit} onChange={e => setGuest_limit(e.target.value)} />
                </div>

                <div className='form-input'>
                    <label htmlFor="upload_photo">upload photo</label>
                    <input name='image_url' id='image_url_input' type="file" accept="image/*" onChange={updateImage_url} />
                </div>



                <div className='submit_btn_div'>
                    <button className='spot_btn' type='submit'>Host Spot</button>
                </div>
            </form>
            </div>


        </div>
    )
}

export default SpotForm
