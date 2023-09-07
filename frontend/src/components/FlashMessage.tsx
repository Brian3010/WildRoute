import CloseIcon from '@mui/icons-material/Close';
import { Alert, Collapse, IconButton } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useFlashMessage from '../hooks/useFlashMessage';

export default function FlashMessage() {
  console.log('FlashMessage render');
  const location = useLocation();

  const [open, setOpen] = useState(true);
  const { flashMessage } = useFlashMessage(); // from context
  const openFlashMsg = location.state?.openFlashMsg; // from state returned navigate(...)

  const openFlash = flashMessage.message.length > 0 && openFlashMsg; // true && true

  // flashMessage automatically disappeared in n seconds
  setTimeout(() => {
    setOpen(false);
  }, 4000);

  return (
    openFlash && (
      <Collapse in={open}>
        <Alert
          severity={flashMessage.type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {flashMessage.message}
        </Alert>
      </Collapse>
    )
  );
}
// export default function FlashMessage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   console.log('file: FlashMessage.tsx:8 ~ FlashMessage ~ location:', location);
//   const flashMessage: { type: 'success' | 'error'; message: string } = location.state?.flashMessage;
//   // console.log('file: FlashMessage.tsx:11 ~ FlashMessage ~ flashMessage:', flashMessage);
//   const [open, setOpen] = useState(true);

//   // const flashMessage = useRef<{ type: 'success' | 'error'; message: string } | undefined>(undefined);

//   // setTimeout(() => {
//   //   setOpen(false);
//   // }, 4000);

//   // if(!open) location.state.flashMessage = undefined;
//   // useEffect(() => {
//   //   navigate( location.state?.from,{ replace: true });
//   // }, [location.pathname, location.state?.from, navigate]);

//   return (
//     flashMessage && (
//       <Collapse in={open}>
//         <Alert
//           severity={flashMessage.type}
//           action={
//             <IconButton
//               aria-label="close"
//               color="inherit"
//               size="small"
//               onClick={() => {
//                 setOpen(false);
//               }}
//             >
//               <CloseIcon fontSize="inherit" />
//             </IconButton>
//           }
//         >
//           {flashMessage.message}
//         </Alert>
//       </Collapse>
//     )
//   );
// }
