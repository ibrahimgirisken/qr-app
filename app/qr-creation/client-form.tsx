'use client'
import React from 'react'
import { Button, Form, FormControl, Row} from 'react-bootstrap'
import QrResult from '../qr-result/page'
import { AiOutlineClear } from "react-icons/ai";
import Download from '../download/page';

function ClientForm() {
    const [finalQrValue,setFinalQrValue]=React.useState(' ')
    const qrRef = React.useRef<HTMLDivElement>(null);
    return (
        <div className='border rounded-2xl p-3 border-green-400'>
            <h6>QR Code Generator</h6>
            <Form className='my-5'>
                <Row className='block justify-center-safe gap-2'>
                    <FormControl 
                    className='bg-white w-75 text-center border  border-green-400 hover:border-green-600 rounded-2xl px-4 py-2' 
                    required 
                    type="text" 
                    placeholder='QR Giriniz'
                    value={finalQrValue ?? ''}
                    onChange={(e)=>setFinalQrValue(e.target.value)}
                    ></FormControl>
                    <Button onClick={() => setFinalQrValue(' ')}><AiOutlineClear /></Button>
                </Row>
            </Form>
            <div className="block justify-center">
            <QrResult ref={qrRef} qrcode={finalQrValue||''} />
            <Download targetRef={qrRef} />
            </div>
        </div>
    )
}

export default ClientForm