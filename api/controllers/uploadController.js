// import User from '../models/userModel.js';

// /**
//  * Uploads a profile picture to Cloudinary and updates the user profile.
//  * @param {Object} req - Express request object.
//  * @param {Object} res - Express response object.
//  */
// export const uploadProfilePicture = async (req, res) => {
//   try {
//     const { userId } = req.body;
    
//     if (!req.file || !req.file.path) {
//       return res.status(400).json({ success: false, message: 'No image provided' });
//     }

//     const imageUrl = req.file.path; // Get Cloudinary URL

//     // Update user profile picture in MongoDB
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { profilePicture: imageUrl },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     res.status(200).json({ success: true, profilePicture: updatedUser.profilePicture });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Error uploading image' });
//   }
// };
