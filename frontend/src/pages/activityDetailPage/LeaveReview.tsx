import { Box, Button, Rating, TextareaAutosize } from '@mui/material';
import { useRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ReturnCreatedReview from '../../@types/ReturnCreatedReview';
import '../../assets/LeaveReview.css';
import { IAuthContext } from '../../context/AuthProvider';
import useAuth from '../../hooks/useAuth';
import useAxiosInterceptor from '../../hooks/useAxiosInterceptor';
import useFlashMessage from '../../hooks/useFlashMessage';
import { TActyDetail } from '../../services/getActyById';

interface IReviewData {
  textBody: string;
  rating: number;
}

const LeaveReview = ({ onReviewAdded }: { onReviewAdded: (newReview: TActyDetail['reviews'][number]) => void }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    // formState: { errors },
    watch,
  } = useForm<IReviewData>({
    mode: 'onSubmit',
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
  const { setFlashMessage } = useFlashMessage();
  const isError = useRef<boolean>();

  const submit: SubmitHandler<IReviewData> = async data => {
    // set flash message if not authenticated
    if (auth.user._id.length <= 0) {
      setFlashMessage({ type: 'error', message: 'You must be signed in first' });

      return navigate('/activities/user/login', {
        state: { from: location, openFlashMsg: true },
      });

      // return navigate('/activities/user/login', {
      //   state: { from: location, flashMessage: { type: 'error', message: 'You must be signed in first!' } },
      // });
    }

    if (!id) throw new Error('Cannot find id param from LeaveReview component ');
    console.log(data);

    try {
      const res = await axiosInterceptor.post<ReturnCreatedReview>(`/activities/${id}/review`, {
        review: {
          body: data.textBody,
          rating: data.rating,
        },
      });

      if (res === undefined) throw new Error('Response Undefined');
      // console.log('res.data: ', res.data);
      onReviewAdded(res.data.reviewCreated);
    } catch (error) {
      console.error(error);
      // handle refreshToken expired and Unauthorized
      navigate('/activities/user/login', { state: { from: location, replace: true } });
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end', marginBottom: 2 }}>
        <Controller
          name="rating"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => <Rating onChange={onChange} value={Number(value)}></Rating>}
        />
      </Box>

      <TextareaAutosize minRows={5} minLength={5} maxLength={50} className="text-area" {...register('textBody')} />
      <Button type="submit" variant="contained" disabled={(isError.current = watch('rating') === 0)}>
        Submit
      </Button>
    </form>
  );
};

export default LeaveReview;
