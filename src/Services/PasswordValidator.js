function MeetsPasswordPolicy(password)
{
    const regEx = new RegExp("^(?=.*[a-z])(?=.*[A-Z]).{8,32}$"); 
    return regEx.test(password);
};

export default { MeetsPasswordPolicy };