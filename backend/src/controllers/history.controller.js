import {History} from "../models/history.models.js"

async function Set_Match_History(req, res) {
    const { user1, user2, winner } = req.body;

    try {

        if (!user1 || !user2 || !winner) {
            console.log("No user history data found to set");
            return res.status(400).json({ error: "Unable to find user history data" });
        }
        
        if (user1 === user2) {
            console.log("Cannot save history for the same user");
            return res.status(400).json({ error: "User1 and User2 cannot be the same" });
        }


        const newHistory = await History.create({
            user1: user1.toLowerCase(),
            user2: user2.toLowerCase(),
            winner: winner.toLowerCase()
        });

        const createdHistory = await History.findById(newHistory._id);
        if (!createdHistory) {
            console.log("Failed to retrieve created history");
            return res.status(500).json({ error: "Failed to save match history" });
        }


        // update rating
        try {
            const user_match_data = await Get_All_Match_History(req);
            if(user_match_data){
                const total_matches = Number(user_match_data.UserHistory.length);
                const total_matches_won = Number(user_match_data.UserWinHistory.length);
                const rate = (total_matches_won * 100) / (total_matches!==0?total_matches:1);
                const update_rating_status = await req.user.UpdateUserRating(Number(rate));
                if (update_rating_status) {
                    await req.user.save({ validateBeforeSave: false });
                }
            }
            else{
                console.log("no user match history found");
            }

        } catch (error) {
            console.log("unable to update user rating");
        }

        //console.log("Match history created:", createdHistory);
        return res.status(200).json({ message: "Updated match successfully", data: createdHistory });

    } catch (error) {
        console.log("Error in saving match history:", error);
        return res.status(500).json({ error: "An error occurred while saving match history" });
    }
}

async function Get_All_Match_History(req, res = null) {
    const user = req?.user?.username;
    if (!user) {
        if (res) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        else return null;
    }

    try {
        const gethistory = await History.find({
            $or: [
                { user1: user },
                { user2: user }
            ]
        });

        const getWinhistory = await History.find({ winner: user });

        const data = {
            UserHistory: gethistory,
            UserWinHistory: getWinhistory
        };

        if (res) {
            return res.status(200).json(data);
        }

        return data;

    } catch (error) {
        if (res) {
            return res.status(500).json({ error: "Error while fetching user history: " + error.message });
        }
        throw new Error("Error while fetching user history: " + error.message);
    }
}





export {
    Get_All_Match_History,
    Set_Match_History
}