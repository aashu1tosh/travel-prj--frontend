import { PiChartLineUpBold } from 'react-icons/pi';
import './DashboardBox.css';

interface DashboardBoxProps {
    title: string;
    number: string;
    growth: string;
}

const DashboardBox = (props: DashboardBoxProps) => {
    const { title, number, growth } = props;
    return (
        <div className='dashboard-box'>
            <h2>{title}</h2>
            <p id='number'>{number}</p>
            <p id='percent'>
                <PiChartLineUpBold /> {growth}%
            </p>
        </div>
    );
};

export default DashboardBox;
