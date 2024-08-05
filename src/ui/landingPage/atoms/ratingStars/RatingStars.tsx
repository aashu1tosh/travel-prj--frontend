import { useMemo } from 'react';
import { FaStar } from 'react-icons/fa';

const RatingStars = ({ rating }: { rating: number }) => {
    // Memoize the renderStars calculation
    const renderStars = useMemo(() => {
        if (rating === null) return null;
        return Array.from({ length: rating }, (_, index) => (
            <FaStar key={index} style={{ color: 'gold' }} />
        ));
    }, [rating]);

    return <div>{renderStars}</div>;
};

export default RatingStars;
