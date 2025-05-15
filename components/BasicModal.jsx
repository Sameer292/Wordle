import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import '@fontsource/arvo';
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
};

export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button variant='contained' onClick={handleOpen} style={{ marginRight: '2.5rem', padding: '0.75rem' }}>
                How to play?
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" color='#f8f8f8' fontFamily={'Arvo'} fontSize={30} fontWeight={700} variant="h6" component="h2">
                        How to play
                    </Typography>
                    <Typography id="modal-modal-description" color='#f8f8f8' fontFamily={'Arvo'} fontSize={17} fontWeight={550} variant='body1' >
                        You have 6 tries to guess the word
                    </Typography>
                    <Typography id="modal-modal-description" color='#f8f8f8' fontFamily={'Arvo'} fontSize={15} variant='body1' sx={{ mt: 2 }}>
                        • Each guess must be a valid 5 letter word.
                        <br />
                        • The color of the tiles will show how close your guess is.
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
