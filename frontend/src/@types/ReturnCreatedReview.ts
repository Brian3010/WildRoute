export default interface ReturnCreatedReview {
  reviewCreated: {
    body: string;
    rating: 5;
    _id: string;
    owner: { _id: string; username: string };
  };
}
