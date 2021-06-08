import React from "react";
import { actions } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import "./ConfigComp.css";

export default function SwitchesGroup() {
  const fieldSubscription = useSelector((state) => state.editSubscription);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(
      actions.settingFields({
        filedName: [event.target.name],
        value: event.target.checked,
      })
    );
  };

  return (
    <FormControl component="fieldset" className="FormControlW">
      <FormLabel component="legend">Subscription Fields</FormLabel>
      <div>
        <FormGroup className="d-flex justify-content-between">
        <FormControlLabel
          className="d-flex justify-content-between"
          checked={true}
          disabled={true}
          control={<Switch name="Email" />}
          label="Email"
        />
          <FormControlLabel
            className="d-flex justify-content-between"
            control={
              <Switch
                checked={fieldSubscription.name}
                onChange={handleChange}
                name="name"
              />
            }
            label="Name"
          />
          <FormControlLabel
            className="switch d-flex justify-content-between"
            control={
              <Switch
                checked={fieldSubscription.phone}
                onChange={handleChange}
                name="phone"
              />
            }
            label="Phone"
          />
          <FormControlLabel
            className="switch d-flex justify-content-between"
            control={
              <Switch
                checked={fieldSubscription.adress}
                onChange={handleChange}
                name="adress"
              />
            }
            label="Adress"
          />
        </FormGroup>
      </div>
    </FormControl>
  );
}
