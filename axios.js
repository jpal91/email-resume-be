import axios from 'axios'

const body = { starKey: null }
axios.post('https://dvrkfhe7s0.execute-api.us-east-1.amazonaws.com/v1', {...body})
	.then((res) => console.log(res.data.body))
	.catch((err) => console.log(err))