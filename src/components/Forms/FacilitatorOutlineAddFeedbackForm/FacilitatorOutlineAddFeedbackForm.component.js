import React from 'react';
import CustomInput from '../../CustomInput';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import { emailValidator, requiredValidator } from '../../../utils/validation';

const FacilitatorOutlineAddFeedbackForm = props => {

    const { handleSubmit, pristine, invalid, submittingForm } = props

    const rate = props.questions.map(question => {
        return (
            <Field
                key={question.id}
                name={`question_${question.id}`}
                component={CustomInput}
                type="range"
                label={question.question}
                placeholder={question.question}
                validate={[requiredValidator]}
            />
        )
    });

    return (
        <form onSubmit={handleSubmit}>

            { rate }

            <Field
                name="comment"
                component={CustomInput}
                type="text"
                label="Your comment"
                placeholder="Your comment"
            />

            <CustomButton disabled={invalid || pristine} submittingForm={submittingForm}>RATE</CustomButton>
        </form>
    );

}

export default reduxForm({
    form: 'FacilitatorOutlineAddFeedbackForm'
})(FacilitatorOutlineAddFeedbackForm);