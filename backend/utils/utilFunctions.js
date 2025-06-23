const bcrypt = require('bcrypt');

const isEmailValid = function(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

function generateToken(userId){
    const token = userId.toString(36) + Math.random().toString(36).substring(2, 15);
    return token;
}


module.exports = {
    isEmailValid,
    hashPassword,
    verifyPassword,
    generateToken,
}