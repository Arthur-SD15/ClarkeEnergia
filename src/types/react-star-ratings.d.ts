declare module 'react-star-ratings' {
    
  
    interface StarRatingsProps {
      rating: number;
      starRatedColor?: string;
      starEmptyColor?: string;
      starHoverColor?: string;
      numberOfStars?: number;
      starDimension?: string;
      starSpacing?: string;
      changeRating?: (newRating: number) => void;
      name?: string;
    }
  
    const StarRatings: React.FC<StarRatingsProps>;
    export default StarRatings;
}
  