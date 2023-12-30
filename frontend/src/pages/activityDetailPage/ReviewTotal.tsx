interface ReviewTotalProps {
  numOfReviews: number;
}

export default function ReviewTotal({ numOfReviews }: ReviewTotalProps) {

  return (
    <>
      <span style={{ fontSize: 'small', alignSelf: 'end', paddingLeft: 5, color: 'rgba(0, 0, 0, 0.6)' }}>
        {numOfReviews > 0 ? `${numOfReviews} reviews` : `${numOfReviews} review`}
      </span>
    </>
  );
}
