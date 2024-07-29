import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const createUser = async (req, res) => {
	const { email, password, age, username } = req.body;
    
	try {
		const foundUser = await User.findOne({ email });
		if (foundUser) {
			return res.status(400).json(['The email is already in use']);
		}

		const hashedPass = await bcrypt.hash(password, 10);
		const newUser = new User({
			username,
			age,
			email,
			password: hashedPass,
		});

		const userSaved = await newUser.save();

		res.json({
			id: userSaved._id,
			username: userSaved.username,
			age: userSaved.age,
			email: userSaved.email,
			createdAt: userSaved.createdAt,
			updatedAt: userSaved.updatedAt,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.json({
			id: user._id,
			username: user.username,
			age: user.age,
			email: user.email,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getAllUsers = async (req, res) => {
	try {
		const users = await User.find({});
		res.json(users.map(user => ({
			id: user._id,
			username: user.username,
			age: user.age,
			email: user.email,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		})));
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const updateUser = async (req, res) => {
	const { username, email, age, password } = req.body;
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		user.username = username || user.username;
		user.email = email || user.email;
		if (password) {
			user.password = await bcrypt.hash(password, 10);
		}

		const userUpdated = await user.save();

		res.json({
			id: userUpdated._id,
			username: userUpdated.username,
			age: userUpdated.age,
			email: userUpdated.email,
			createdAt: userUpdated.createdAt,
			updatedAt: userUpdated.updatedAt,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const deleteUser = async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.json({ message: 'User deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};