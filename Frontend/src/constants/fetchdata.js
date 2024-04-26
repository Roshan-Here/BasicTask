import { setEdatas } from '../redux/Employee/setEmployeeSlice';
import axios from 'axios';
import datas from './givendata';

export const getdata = async (dispatch) => {
    try {
        const res = await axios.get(import.meta.env.VITE_REQUIRED_API)
        console.log(res.data)

        // setdataas(res.data)
        dispatch(setEdatas(datas))
    }
    catch (err) {
        // getting eroor due to 429 error, to many request so using data same as api ->stored
        console.log(err)
        console.log("setting data as prefetched->using data same as api")
        // setdataas(datas)
        dispatch(setEdatas(datas))
    }
}
