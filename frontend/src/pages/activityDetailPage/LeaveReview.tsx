import { Button, Rating, TextareaAutosize } from '@mui/material';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import '../../assets/LeaveReview.css';

interface IReviewData {
  textBody: string;
  rating: number;
}

const LeaveReview = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<IReviewData>({
    mode: 'onSubmit',
    defaultValues: {
      textBody: '',
      rating: 0,
    },
  });

  const submit: SubmitHandler<IReviewData> = data => {
    console.log(data);

    reset();
  };

  // TODO: validate reviewInputs
  return (
    <form onSubmit={handleSubmit(submit)}>
      <TextareaAutosize minRows={5} className="text-area" {...register('textBody')} />
      <Controller
        name="rating"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => <Rating onChange={onChange} value={Number(value)} />}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default LeaveReview;
