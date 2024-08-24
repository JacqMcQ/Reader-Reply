// document.addEventListener("DOMContentLoaded", () => {
//   const changePasswordButton = document.querySelector(".change-password");

//   changePasswordButton.addEventListener("click", async () => {
//     const newPassword = prompt("Enter your new password:");

//     if (newPassword && newPassword.trim().length > 0) {
//       try {
//         const response = await fetch("/api/users/change-password", {
//           method: "PUT",
//           body: JSON.stringify({ password: newPassword }),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (response.ok) {
//           alert("Password changed successfully.");
//         } else {
//           alert("Failed to change password.");
//         }
//       } catch (err) {
//         console.error("Error:", err);
//         alert("An error occurred while changing the password.");
//       }
//     } else {
//       alert("Password cannot be empty.");
//     }
//   });
// });
