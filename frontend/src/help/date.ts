import moment from 'moment'


export const dateFormat = (date: moment.MomentInput) =>{
    return moment(date).format('DD/MM/YYYY')
}