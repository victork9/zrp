import express from "express";
import api from "axios";
import dotenv from "dotenv";
const app = express();

dotenv.config();

const port = process.env.PORT;
const API_URL = process.env.API_URL;
interface Ability {
    name: string
    url: string
}

interface IResponse {
    ability: Ability
    is_hidden: boolean
    slot: number
}

const sortResponse = (response: IResponse[]) => {
    return response.sort((a, b) => a.ability.name.localeCompare(b.ability.name));
};

app.get("/:pockeName", (req, res) => {
    const { pockeName } = req.params;
    
    api.get<{ abilities: IResponse[] }>(`${API_URL}/${pockeName}`)
        .then(({ data }) => res.json(sortResponse(data.abilities)))
        .catch((error) => {
            const { status, data } = error.response;
            res.json({ status, data });
        });
});

export const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
