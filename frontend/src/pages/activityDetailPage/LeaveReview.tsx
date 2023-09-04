import { Box, Button, Popper, Rating, TextareaAutosize, Tooltip } from '@mui/material';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ReturnCreatedReview from '../../@types/ReturnCreatedReview';
import '../../assets/LeaveReview.css';
import { IAuthContext } from '../../context/AuthProvider';
import useAuth from '../../hooks/useAuth';
import useAxiosInterceptor from '../../hooks/useAxiosInterceptor';

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
      const res = await axiosInterceptor.post<ReturnCreatedReview>(`/activities/${id}/review`, {
        review: {
          body: data.textBody,
          rating: data.rating,
        },
      });
      if (res === undefined) throw new Error('Response Undefined');
    } catch (error) {
      console.error(error);
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Controller
          name="rating"
          control={control}
          rules={{
            required: true,
            validate: {
              positive: value => value > 0 || 'should be greater than 0',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <Box position={'relative'}>
              <Rating onChange={onChange} value={Number(value)} sx={{ marginBottom: 2 }}></Rating>
              {errors.rating && <div id="rating-error-tooltip">{errors.rating.message}</div>}
            </Box>
            // <Tooltip
            //   // disableFocusListener
            //   disableHoverListener
            //   // disableInteractive
            //   arrow={true}
            //   placement="right-end"
            //   title={errors.rating?.message}
            //   open={errors.rating ? true : false}
            //   // PopperProps={{
            //   //   disablePortal: true,
            //   // }}
            // >
            //   <Rating onChange={onChange} value={Number(value)} sx={{ marginBottom: 2 }} />
            // </Tooltip>
          )}
        />
      </Box>
      {/* <Popper open={errors.rating ? true : false}>
        <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>{errors.rating?.message} </Box>
      </Popper> */}

      {/* {errors.rating && <Box sx={{ ml: 2 }} color={"red"} fontSize={'smaller'}> {errors.rating?.message} </Box>} */}

      <TextareaAutosize minRows={5} minLength={5} maxLength={50} className="text-area" {...register('textBody')} />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default LeaveReview;
