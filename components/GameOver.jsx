import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import '@fontsource/arvo';
import { Fade } from '@mui/material';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: '#121213',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    borderRadius: '10px',    
};

export default function GameOver({ isSolved, gameReset, gameRetry }) {
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Fade in={open} out={open} timeout={500}>
                    <Box sx={style} RoundedCorner>
                        <Typography id="modal-modal-title" color='#ff2a08' fontFamily={'Arvo'} fontSize={30} fontWeight={700} variant="h6" component="h2">
                            Game Over!!
                        </Typography>
                        <Typography id="modal-modal-description" color='#f8f8f8' fontFamily={'Arvo'} fontSize={17} fontWeight={550} variant='body1' >
                            { isSolved ? `You guessed the word` : `You couldn't guess the word` }
                        </Typography>
                        {!isSolved && <Button onClick={gameRetry} variant='contained' color='error' >Retry</Button>}
                        <Button variant='contained' onClick={gameReset} color='success' style={{ marginTop: '1rem' }}>
                            Next word
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
