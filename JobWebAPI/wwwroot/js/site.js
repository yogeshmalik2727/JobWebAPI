// Load Job Data 
function loadJobs() {
    // Generate AJAX request for collecting All Job Details
    $.ajax({
        type: "GET",
        url: 'api/Jobs',
        cache: false,
        success: function (data) {
            // Select 
            const divBody = $("#jobData");

            $(divBody).empty(); // Empty the content of Previous Table Body 

            if (data.length == 0) { // If there is no data present
                // Prepare message to Display
                const details = $('<div class="col-md-12"></div>')
                    .append('<h1 class="text-center">There is No Job Posted</h1>');
                // Add Details to Div Body
                details.appendTo(divBody);
            } else {
                // Iterate all JSON data
                $.each(data, function (key, item) {
                    
                    // Prepare Card to For Display Job Details
                    const details = $('<div class="card col-md-4 mb-2"></div>')
                        .append('<div class="card-body"></div>')
                        .append($('<div class="card-title"></div>').html('<h4 class="text-center">' + item.jobTitle + '</h4>'))
                        .append($('<p class="card-text"></p>').html('<strong>Company Name:</strong> ' + item.companyName))
                        .append($('<p class="card-text"></p>').html('<strong>Package:</strong> ' + item.package))
                        .append($('<p class="card-text"></p>').html('<strong>LastDate For Apply:</strong> ' + item.lastDate))
                        .append($('<button class="btn btn-secondary mb-1" data-toggle="modal" data-target="#jobForm">Edit Record</button>')
                            .on("click", function () {
                                // Call get Job Data Details For Edit
                                fetchJob(item.jobID);
                            })
                        )
                        .append($('<button class="btn btn-warning">Delete Record</button>')
                            .on("click", function () {
                                // Call remove Job Data from Database
                                deleteJob(item.jobID);
                            })
                        );
                    // Add Details to Div Body
                    details.appendTo(divBody);
                });
            }
        }
    });
}

// This function used to save Job Details using Web API
function saveDetails() {
    // Fetch Job Form Data

    let title = $('#job_title').val();
    let company = $('#company').val();
    let last_date = $('#last_date').val();
    let package1 = $("#package").val();

    // Fetch Job ID Value
    let jobid = $("#jobid").val();
    let updateForm = false;

    if (jobid != "") {
        updateForm = true;
        jobid = parseInt(jobid)
    }

    // Save Details in Job JSON Data
    let jobdetails = {
        jobtitle: title,
        companyname: company,
        lastdate: last_date,
        package: package1
    };

    let requestType = "POST";
    let apiUrl = 'api/Jobs'
    if (updateForm) {
        jobdetails['jobid'] = jobid;
        requestType = "PUT";
        apiUrl = 'api/Jobs/' + jobid;
    }

    // Request the Web API for Insertion
    $.ajax({
        type: requestType,
        url: apiUrl,
        data: JSON.stringify(jobdetails),
        contentType: "application/json; charset=utf-8"
    }).done(function (response) {
        // Success Message        
        $("#jobForm").modal("hide");
        clearForm();
        let message = "Sale Details are Saved in System";
        if (updateForm) {
            message = "Sale Details are Updated in System";
        }
        $("#message").text(message);
        $("#messageDialog").modal("show");
        // Load Job Details
        loadJobs();
    }).fail(function (xhr, status) {
        // Error Message
        clearForm();
        $("#jobForm").modal("hide");
        $("#message").text("Job Details are not Saved in System");
        $("#messageDialog").modal("show");
    });
}

// Function to Clear Form
function clearForm() {
    $('#job_title').val("");
    $('#company').val("");
    $('#last_date').val('');
    $('#package').val("");
    $("#jobid").val("");
}

// Fetch Details of Job According to its ID
function fetchJob(jobid) {
    $.ajax({
        type: "GET",
        url: 'api/Jobs/' + jobid,
        contentType: "application/json"
    }).done(function (data) {
        // Set Form Data
        $('#jobid').val(data.jobID);
        $('#job_title').val(data.jobTitle);
        $('#company').val(data.companyName);
        $('#package').val(data.package);
        $('#last_date').val(data.lastDate);
    });
}

// Function to delete Job Details
function deleteJob(jobid) {
    // Display a Confirm Box For Confirmation
    let result = confirm("Are Your Sure to Remove this Job Details?");

    if (result) {
        // Request Web API to Delete Sale
        $.ajax({
            type: "DELETE",
            url: 'api/Jobs/' + jobid,
        }).done(function (response) {
            // Refresh Sale Details
            loadSales();
        });
    }
}