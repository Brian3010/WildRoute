import { Button, Rating, TextareaAutosize } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../../assets/LeaveReview.css';
import { IAuthContext } from '../../context/AuthProvider';
import useAuth from '../../hooks/useAuth';
import useAxiosInterceptor from '../../hooks/useAxiosInterceptor';
import { ICreateReview } from '../../services/createReview';

interface IReviewData {
  textBody: string;
  rating: number;
}

const LeaveReview = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IReviewData>({
    mode: 'onChange',
    defaultValues: {
      textBody: '',
      rating: 0,
    },
  });

  const { auth } = useAuth() as IAuthContext;
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const axiosInterceptor = useAxiosInterceptor();

  const submit: SubmitHandler<IReviewData> = async data => {
    // set flash message
    if (auth.user._id.length <= 0) {
      // showMessage('You must be signed in first!');
      return navigate('/activities/user/login', {
        state: { from: location, flashMessage: { type: 'error', message: 'You must be signed in first!' } },
      });
    }

    if (!id) throw new Error('Cannot find id param from LeaveReview component ');
    // TODO: handle token
    console.log(data);

    try {
      const res = await axiosInterceptor.post<ICreateReview>(`/activities/${id}/review`, {
        review: {
          body: data.textBody,
          rating: data.rating,
        },
      });
      if (!res) throw new Error('response undefined');
    } catch (error) {
      console.error(error);
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Controller
        name="rating"
        control={control}
        rules={{
          required: true,
          // validate: value => value === 0 || value < 1 || value > 5 || 'Invalid Rating',
        }}
        render={({ field: { onChange, value } }) => (
          <Rating onChange={onChange} value={Number(value)} sx={{ marginBottom: 2 }} />
        )}
      />
      {errors && <div>{errors.rating?.message}</div>}
      <TextareaAutosize minRows={5} minLength={5} maxLength={50} className="text-area" {...register('textBody')} />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default LeaveReview;
