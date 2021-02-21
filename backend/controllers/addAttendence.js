const Attendence = require('../dbModels/attendenceSchema');

exports.addAttendence = (req, res) => {
    const {
        _day, studentId
    } = req.body

    const attendence = new Attendence({
        _day, studentId
    });

    attendence.save((err, attend) => {
        if (err) {
            return res.status(400).json({
                err
            });
        }
        if (attend) {
            return res.status(200).json({
                attend
            });
        }
    });

}