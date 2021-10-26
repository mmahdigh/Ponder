import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Formik, Form as FormikForm, Field } from 'formik';
import { InputGroup, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import RssButton from './rss-button';

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
      {({ submitting }) => (
        <FormikForm>
          <Form.Group controlId="query">
            <InputGroup>
              <Field name="query" disabled={submitting} placeholder="RSS URL" />
              <SearchButton>
                <RssButton />
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
