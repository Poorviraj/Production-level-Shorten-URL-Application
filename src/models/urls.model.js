const mongoose = require('mongoose');


const URLSchema = new mongoose.Schema({
    originalURL: {
        type: String,
        required: true
    },
    KeyId: {
        type: String,
        required: true
    },
    ClickedCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Number,
        default: new Date().getTime()
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    openedAtTimestamp: [
        {
            type: Number,

        }
    ],
    oprnedAtLocation: [
        {
            type: String
        }
    ]
});

const URLSModel = mongoose.model("urls",URLSchema);

module.exports = URLSModel

