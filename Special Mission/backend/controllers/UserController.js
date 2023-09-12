import User from '../models/UserModel.js';

export const getUsers = async (req,res) => {
    try {
        const response = await User.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getUsersById = async (req,res) => {
    try {
        const response = await User.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createUser = async (req,res) => {
    try {
        console.log(req.body);
        const data = await User.create(req.body);
        res.status(201).json({msg: "berhasil buat user baru", data: data})
    } catch (error) {
        console.log(error.message);
    }
}

export const updateUser = async (req,res) => {
    try {
        console.log(req.body);
        const data = await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(201).json({msg: "berhasil update user", data: data})
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id; // Ambil ID dari parameter URL

        // Menggunakan klausa 'where' untuk menghapus pengguna dengan ID yang sesuai
        const data = await User.destroy({
            where: {
                id: id
            }
        });

        if (data === 1) {
            // Data berhasil dihapus (data === 1 menunjukkan satu baris dihapus)
            res.status(200).json({ msg: "User berhasil dihapus" });
        } else {
            // Data tidak ditemukan
            res.status(404).json({ msg: "User tidak ditemukan" });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan saat menghapus user" });
    }
};
