import Joi from 'joi';

const userSchema = Joi.object({
	email: Joi.string()
		.email({ minDomainSegments: 2 })
		.message('Enter a valid email address')
		.required(),
	username: Joi.string()
		.max(30)
		.regex(/^[a-zA-Z0-9_.]*$/)
		.required()
		.messages({
			'string.max': 'Enter a username under 30 characters.',
			'string.pattern.base':
				'Usernames can only use letters, numbers, underscores and periods.',
		}),
	fullName: Joi.string().max(30).allow('').messages({
		'string.max': 'Enter a name under 30 characters.',
	}),
	bio: Joi.string().max(150).allow('').messages({
		'string.max': 'Bio must be less than 150 characters',
	}),
	password: Joi.string(),
});

export default userSchema;
