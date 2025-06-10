import db from '#db/client';

export async function createTask(userId, title, done) {
    const sql = `
        INSERT INTO tasks (title, done, user_id)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const { rows: [task] } = await db.query(sql, [userId, title, done]);
    return task;
}

export async function getTaskById(id) {
    const sql = `
        SELECT * FROM tasks
        WHERE id = $1;
    `;
    const { rows: [task] } = await db.query(sql, [id]);
    return task;
}


export async function deleteTask(id) {
    const sql = `
        DELETE FROM tasks
        WHERE id = $1;
    `;
    const result = await db.query(sql, [id]);
    return result;
} 

export async function updateTask(title, done, id) {
    const sql = `
        UPDATE tasks
        SET title = $1, done = $2
        WHERE id = $3
        RETURNING *;
    `;
    const { rows: [task] } = await db.query(sql, [title, done, id]);
    return task;
}