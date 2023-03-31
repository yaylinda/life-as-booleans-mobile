import { Box } from 'native-base';
import type moment from 'moment';

interface WeekViewProps {
    startDate: moment.Moment;
}

const WeekView = ({startDate }: WeekViewProps) => {
    return (
        <Box flex={1}>{startDate.format('MMM DD')}</Box>
    );
};

export default WeekView;
