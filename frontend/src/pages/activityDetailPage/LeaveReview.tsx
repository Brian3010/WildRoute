import { Button, Rating, TextareaAutosize } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../../assets/LeaveReview.css';
import { IAuthContext } from '../../context/AuthProvider';
import useAuth from '../../hooks/useAuth';
import useFlashMessage from '../../hooks/useFlashMessage';
import createReview from '../../services/createReview';

interface IReviewData {
  textBody: string;
  rating: number;
}

const LeaveReview = () => {
  const { register, handleSubmit, control, reset } = useForm<IReviewData>({
    mode: 'onSubmit',
    defaultValues: {
      textBody: '',
      rating: 0,
    },
  });

  const { auth } = useAuth() as IAuthContext;
  const navigate = useNavigate();
  const location = useLocation();
  const { showMessage } = useFlashMessage();
  const { id } = useParams();

  const submit: SubmitHandler<IReviewData> = async data => {
    // set flash message
    if (auth.user._id.length <= 0) {
      showMessage('You must be signed in first!');
      return navigate('/activities/user/login', { state: { from: location } });
    }
    if (!id) throw new Error('Cannot find id param from LeaveReview component ');
    // TODO: handle token
    console.log(data);
    try {
      const res = await createReview(id, data.rating, data.textBody, auth.accessToken);
      console.log('file: LeaveReview.tsx:42 ~ constsubmit:SubmitHandler<IReviewData>= ~ res:', res);
    } catch (error) {
      console.warn(error);
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Controller
        name="rating"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <Rating onChange={onChange} value={Number(value)} sx={{ marginBottom: 2 }} />
        )}
      />
      <TextareaAutosize minRows={5} minLength={5} maxLength={50} className="text-area" {...register('textBody')} />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default LeaveReview;
