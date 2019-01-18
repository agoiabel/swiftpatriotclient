import React from 'react';
import CustomInput from '../../CustomInput';
import CustomButton from '../../CustomButton';
import { Field, reduxForm } from 'redux-form';
import { emailValidator, requiredValidator } from '../../../utils/validation';

class FacilitatorOutlineAddFeedbackForm extends React.Component {

    state = {
        // questions: {}
    };

    handleChange = (event, newValue, previousValue, name) => {
        console.dir(name);
        console.dir(newValue);
        // this.setState({
        //     name: newValue
        // });
    }

    render () {

        const rate = this.props.questions.map(question => { 

            let inputName = `question_${question.id}`; 

            return (
                <div key={question.id}>
                    <Field
                        name={`${inputName}`}
                        component={CustomInput}
                        type="range"
                        label={question.question}
                        placeholder={question.question}
                        validate={[requiredValidator]}
                        onChange={this.handleChange}
                    />
                    <div>
                        {/* {this.state.name.value} */}
                    </div>
                </div>
            )
        });

        return (
            <form onSubmit={this.props.handleSubmit}>

                {rate}

                <Field
                    name="comment"
                    component={CustomInput}
                    type="text"
                    label="Your comment"
                    placeholder="Your comment"
                />

                <CustomButton disabled={this.props.invalid || this.props.pristine} submittingForm={this.props.submittingForm}>RATE</CustomButton>
            </form>
        );

    }
}

export default reduxForm({
    form: 'FacilitatorOutlineAddFeedbackForm'
})(FacilitatorOutlineAddFeedbackForm);