const UserModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const createToken = (_id) => {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  const token = jwt.sign({ id: _id }, JWT_SECRET_KEY, { expiresIn: "1d" });

  return token;
};

const UserController = {
  RegisterUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = {
        name: name,
        email: email,
        password: password,
      };
      let userisExist = await UserModel.findOne({ email });
      if (userisExist)
        return res.status(400).json({ msg: "Email já cadastrado" });

      if (!name || !email || !password)
        return res
          .status(400)
          .json({ msg: "Todos os campos são obrigatórios" });

      if (!validator.isEmail(email))
        return res.status(400).json({ msg: "Formato de email inválido" });

      if (!validator.isStrongPassword(password))
        return res.status(400).json({ msg: "A senha deve ser mais forte" });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      const newUser = await UserModel.create(user);
      const token = createToken(newUser._id);

      res.status(201).json({
        _id: newUser._id,
        name,
        email,
        token: token,
      });
    } catch (error) {
      res.status(500).json({ msg: "Error interno", statusError: 500 });
    }
  },

  LoginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user)
        return res.status(404).json({ msg: "Usuário não cadastrado" });

      const isValidpassword = await bcrypt.compare(password, user.password);
      if (!isValidpassword)
        return res.status(404).json({ msg: "Usuário ou senha incorretos" });

      const token = createToken(user._id);
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email,
        token: token,
      });
    } catch (error) {
      res.status(500).json({ msg: "Error interno", statusError: 500 });
    }
  },
  findUser: async (req, res) => {
    try {
      const userid = req.params.id;
      const user = await UserModel.findById(userid).select("-password");
      if (!user) return res.status(404).json({ msg: "Usuário não encontrado" });

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ msg: "Error interno", statusError: 500 });
    }
  },
  findAll: async (req, res) => {
    try {
      const users = await UserModel.find().select("-password");
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ msg: "Error interno", statusError: 500 });
    }
  },
};

module.exports = UserController;
