import 'react-animation/dist/keyframes.css'
import {AnimateOnChange} from 'react-animation'
import React, { useState, useEffect } from 'react'
import lamp from './lamp.png';
import {Media, Row, Col, Container} from 'react-bootstrap';
export default function LightZ () {
//const { AnimateOnChange, HideUntilLoaded } = ReactAnimation
  const words = [
    'DO YOU HAVE ELECTRICITY?',
    'EASILY REGISTER OR LOG IN ',
    'HELP OTHERS BY LEAVING YOUR REPORT...',
    'FIND OUT WHICH CITIES AND STATES WERE REPORTED AT OUR HOME PAGE',
    '24 HOURS AGO',
    '3 DAYS AGO',
    'FIND TIPS THAT WILL HELP YOU TO GO THROUGH HARD TIMES WITHOUT ELECTRICITY',
    'WE ARE HERE TO HELP YOU',
    'LEAVE YOU COMMENT OR MESSAGE TO HELP US MAKE THIS APP MORE USEFUL'
  ]
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      if (current === words.length - 1) {
        setCurrent(0)
      } else {
        setCurrent(current + 1)
      }
    }, 3000);
    return (() => {
      clearInterval(interval)
    })
  })
  return (
    <div className='page'>
    <Container>
     <Row>
     <Col sm={3}>
    <Media className='justify-content-center m-3'>
    <img
    className=''
    width={300}
    height={300}
    src={lamp}
    alt='logo'
     />
    </Media>
    </Col>
    <Col sm={9}>
    <h1><AnimateOnChange style={{color:'black', fontWeight:'900', fontFamily: 'veranda'}}>{words[current]}</AnimateOnChange></h1>
    </Col>
    </Row>
    </Container>
     </div>
  )
}