const nodemailer = require('nodemailer');

const transpoter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'liu1cm@uwindsor.ca',
        pass: 'leleAIlaopo1314!'
    }
});

const ctc = {
    '1': {
        'query': {
            'lastUpdated': 'yesterday',
            'Type': 'Personal'
        },
        'count': 16
    },
    '2': {
        'query': {
            'lastUpdated': 'today',
            'Type': 'Business'
        },
        'count': 12
    },
};

const mailOptions = {
    from: 'liu1cm@uwindsor.ca',
    to: '415110593@qq.com',
    subject: 'Hello',
    html: `
             <h1>Hello, Datahub fellows</h1>
             <table>
                 <th>
                     <tr>Query</tr>
                     <tr>Count</tr>
                 </th>    
                 {% for el in ctc %}
                     <P>${JSON.stringify(ctc[el].query)}</P>
                     <p>${ctc[el].count}</p> 
                 {% endfor %}
             </table>
          `
};

transpoter.sendMail(mailOptions, (err, info) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Email sent');
    }
});