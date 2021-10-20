import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form as FormikForm, Field } from 'formik';
import { InputGroup, Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { FaSearch } from 'react-icons/fa';

const validationSchema = Yup.object().shape({
  query: Yup.string().url().required().trim(),
}).required();

function SearchPodcasts({ onSubmit }) {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        query: '',
      }}
      onSubmit={onSubmit}
    >
      {({ submitting, errors }) => (
        <FormikForm>
          {console.log(errors)}
          <Form.Group controlId="query">
            <InputGroup>
              <Field name="query" disabled={submitting} />
              <InputGroup.Text>
                <Button type="submit">
                  <FaSearch />
                </Button>
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </FormikForm>
      )}
    </Formik>
  );
}

SearchPodcasts.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchPodcasts;
