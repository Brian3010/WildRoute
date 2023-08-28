import { Button, Rating, TextareaAutosize } from '@mui/material';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../assets/LeaveReview.css';
import { IAuthContext } from '../../context/AuthProvider';
import useAuth from '../../hooks/useAuth';

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

  const submit: SubmitHandler<IReviewData> = data => {
    if (auth.user._id.length <= 0) return navigate('/activities/user/login', { state: { from: location } });
    console.log(data);

    reset();
  };

  // TODO: send data to backend
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
