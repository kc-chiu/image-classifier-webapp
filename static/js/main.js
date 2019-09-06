$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();

    // Upload Preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
                $('#imageInput').attr("src", e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    });

    // Predict
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);

        // Show loading animation
        $(this).hide();
        $('.loader').show();

        // Make prediction
        let net;
        async function predict() {
            // Load the model.
            console.log('Loading mobilenet..');
            net = await mobilenet.load();
            console.log('Sucessfully loaded model');

            // Make a prediction through the model on input image.
            const imgInput = document.getElementById('imageInput');
            const preds = await net.classify(imgInput);
            console.log(preds);
            result = preds[0].className
            $('.loader').hide();
            $('#result').fadeIn(600);
            $('#result').text(' Result:  ' + result);
            console.log('Success!');
        }

        predict();
    });

});
