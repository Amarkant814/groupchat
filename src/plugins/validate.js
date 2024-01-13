import { Form, Field, ErrorMessage, defineRule, configure } from "vee-validate";
import { required, min, min_value, max, max_value, numeric,email } from "@vee-validate/rules";

defineRule("required", required);
defineRule("min", min);
defineRule("max", max);
defineRule("max_value", max_value);
defineRule("min_value", min_value);
defineRule("numeric", numeric);
defineRule("email", email);
configure({
  generateMessage: ({ rule }) => {
    const messages = {
      max_value: "This field can't be more than " + rule.params[0],
      min_value: "This field can't be less than " + rule.params[0],
      max: "This field's length can't be more than " + rule.params[0],
      min: "This field's length can't be less than " + rule.params[0],
      required: "This field is required",
      numeric: "This field must contain only numerics",
      email:"* Please choose a valid email"
    };
    return messages[rule.name];
  },
});


export { Form, Field as InputValidator, ErrorMessage};
