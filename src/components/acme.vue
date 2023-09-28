<script>


</script>

<template>
    <div class="base">
        <div class="left-container">
            <div class="reg-container">
                <div class="reg-main-text">
                    <h1>Welcome to Acme.</h1>
                    <h6>Create your account by filling the form below.</h6>
                </div>
                <div class="form-container">
                    <form method="post">
                        <div class="txt_field">
                            <input type="text" required>
                            <span></span>
                            <label>Email</label>
                        </div>
                        <div class="txt_field psw">
                            <input type="password" required>
                            <span>
                                <i class="fas"></i>
                            </span>
                            <label>Password</label>
                        </div>
                        <div class="remember">
                            <input type="checkbox" class="custom-checkbox" id="remember-checkbox">
                            <label for="remember-checkbox"></label>
                            <h5>Remember me.</h5>
                        </div>
                        <div class="btn-container">
                            <button>Sign up</button> 
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="right-container">
            <div class="logo"></div>
            <div class="text-container">

            </div>
            <button>Log in</button>
        </div>
    </div>
</template>
