import "./WeatherCard.scss"

const WeatherCard = ({condition, day, temp, timestamp,Icon, first}: any) => {
    const styles = first ? "weather-card first" : "weather-card"
    return (
        <div className={styles}>
            <Icon className='weather-icon'/>
            <p className='text-md' >{day}</p>
            <div className='divider'>
                <p className='text-sm mt-6' >{timestamp}</p>
                <p className='text-lg'> {Math.round(temp.day)}℃</p>
                <p className='text-base mb-20'> {condition.toLowerCase()}</p>
            </div>
        </div>
    )
}

export default WeatherCard;