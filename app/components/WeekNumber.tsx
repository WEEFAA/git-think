import { WeekNumberProps } from 'react-day-picker'

const WeekNumber: React.FC<WeekNumberProps> = function (props) {
	return <span className="rdp-custom-weeknumber">W{props.number}</span>
}

export default WeekNumber
