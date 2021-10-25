import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Formik, Form as FormikForm, Field } from 'formik';
import { InputGroup, Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { FaRss, FaPlus } from 'react-icons/fa';

const SearchButton = styled(InputGroup.Text)`
  padding-top: 0;
  padding-right: 0;
  padding-bottom: 0;
  padding-left: .2em;

  button {
    margin: 0;
    border: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const PlusIcon = styled(FaPlus)`
  position: absolute;
  right: 4px;
  top: 4px;
  font-size: .7rem;
`;

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
              <Field name="query" disabled={submitting} placeholder="RSS URL" />
              <SearchButton>
                <Button type="submit">
                  <FaRss />
                  <PlusIcon />
                </Button>
              </SearchButton>
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
