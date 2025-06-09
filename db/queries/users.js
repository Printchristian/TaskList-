import bcrypt from 'bcrypt';
import db from '#db/client';


export async function createUser(username, password) {
    // IN PRACTICE IT IS OFTEN A GOOD IDEAD TO HAVE A try catch 
    // here in the data layer
    //if there is an error internally from the data layer 
    // dont use RETURNING * USE SELECT COLUMNS DONT RETURN PASSWORD
    const sql = ` 
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING *;
    `;
    const hashedPaword = await bcrypt.hash(password, 10); 
    const { 
        rows: [user],
    } = await db.query(sql, [username, hashedPaword]);
    return user;
}

export async function getUserByUsernameAndPassword(username, password) {
    const sql = `
    SELECT * FROM users
    WHERE username = $1;
    `;
    const { rows: [user] } = await db.query(sql, [username]);
    if (!user) return null;
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;
        return user;
    }

export async function getUserById(id) {
    const sql = `
    SELECT * FROM users
    WHERE id = $1;
    `;
    const { rows: [user] } = await db.query(sql, [id]);
    return user;
}