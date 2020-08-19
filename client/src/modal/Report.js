import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";
import Axios from "axios";
import ErrorNotice from "../components/misc/ErrorNotice";
import { Button, Modal } from 'react-bootstrap';







export default function Report() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [answer, setAnswer] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [error, setError] = useState();



  const { register, handleSubmit } = useForm();


  const history = useHistory();

  const submit = async () => {

    try {
      const report = { answer, city, state };
      const reportRes = await Axios.post(
        "/api/report",
        report
      );

      localStorage.setItem("auth-token", JSON.stringify(reportRes.data));
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };


  return (
    <div className="text-center" >
      <Button className="btn-1 btn-warning" onClick={handleShow}>
        Make your report
        </Button>

      <Modal className="" show={show} onHide={handleClose}>
        <Modal.Header closeButton className="mod">
          <Modal.Title className="ml-5 mod text-warning">Do you have Electricity?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mod">

          <form className="mod" onSubmit={handleSubmit(submit)}>
            <div className="mod">
              <label className="text-warning mr-1">Yes</label>
              <input className="mr-4 " name="radio" type="radio" value={true} ref={register} onChange={(event) => setAnswer(event.target.value)} />
              <label className="text-danger mr-1">No</label>
              <input name="radio" type="radio" value={false} ref={register} onChange={(event) => setAnswer(event.target.value)} />
              <br />
              <hr />
            </div>
            
            <input className="form-control mod" type="text" name="city" placeholder="City" ref={register} onChange={(event) => setCity(event.target.value)} />
            <br />
            <select className="custom-select mod" name="state" ref={register} onChange={(event) => setState(event.target.value)}>
              <option >Select your State</option>
              <option value="Amazonas">Amazonas</option>
              <option value="Anzoátegui">Anzoátegui</option>
              <option value="Apure">Apure</option>
              <option value="Aragua">Aragua</option>
              <option value="Barinas">Barinas</option>
              <option value="Bolívar">Bolívar</option>
              <option value="Carabobo">Carabobo</option>
              <option value="Cojedes">Cojedes</option>
              <option value="	Delta Amacuro">	Delta Amacuro</option>
              <option value="Falcón">Falcón</option>
              <option value="Guárico">Guárico</option>
              <option value="La Guaira">La Guaira</option>
              <option value="Lara">Lara</option>
              <option value="Mérida">Mérida</option>
              <option value="Miranda">Miranda</option>
              <option value="Monagas">Monagas</option>
              <option value="Nueva Esparta">Nueva Esparta</option>
              <option value="Portuguesa">Portuguesa</option>
              <option value="Sucre">Sucre</option>
              <option value="Táchira">Táchira</option>
              <option value="Trujillo">Trujillo</option>
              <option value="Yaracuy">Yaracuy</option>
              <option value="Zulia">Zulia</option>
              <option value="Caracas(Capital District)">Caracas(Capital District)</option>
              <option value="Federal Dependencies">Federal Dependencies</option>
            </select>
            <br />
            <hr />
            <button className="btn bor btn-danger" onClick={handleClose}>Cancel</button>
            <button className="btn btn-1 btn-warning" type="submit" onSubmit={submit}>Report</button>

          </form>


        </Modal.Body>
        <Modal.Footer className="justify-content-center mod">
          {error && (<ErrorNotice message={error} clearError={() => setError(undefined)} />)}
        </Modal.Footer>



      </Modal>

    </div>
  );
}
