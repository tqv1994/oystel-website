<Dialog
        bind:open={open}
        fullscreen
        aria-labelledby="fullscreen-title"
        aria-describedby="fullscreen-content"
        on:MDCDialog:closed={closeHandler}
        id="signin-modal" class="dark"
>
    <Content id="fullscreen-content">
        <IconButton on:click={closeHandler} action="close" class="material-icons close-modal">close</IconButton>
        <div class="content-wrap">
            <div class="container">
                <LayoutGrid>
                    <Cell spanDevices={{desktop: 5, mobile: 12}}>
                        <div>
                            <h3 class="text-sub-title mb-50">Lorem ipsum dolor sit sen amet, consectetur adipiscing elit, sed do eiusmod tempor.</h3>
                            <h1 class="m-mb-0" >Welcome Back</h1>
                        </div>
                    </Cell>
                    <Cell spanDevices={{default: 4, mobile: 12}}>
                        <div class="signin-form">
                            <form on:submit={onSubmit} action="javascript:void(0);">
                                <div class="form-control mb-8">
                                    <Textfield style="width: 100%;" bind:value={model.email} label="Email address" type="email"></Textfield>
                                </div>
                                <div class="form-control mb-40">
                                    <Textfield style="width: 100%;" bind:value={model.password} label="Password" type="password"></Textfield>
                                </div>
                                <div class="form-control mb-10 m-mb-30">
                                    <Button  variant="outlined">
                                        <Label class="text-body2">Sign In Now</Label>
                                    </Button>
                                </div>
                                <a href="javascript:void(0);" on:click={doSignUp} class="text-small">Not a member yet? Sign up.</a>
                            </form>
                        </div>
                    </Cell>
                    <Cell span="3">
                        <div class="signin-socials">
                            <p class="text-body2 m-mb-25">Or log in using </p>
                            <Button on:click={signInWithFacebook} variant="outlined" class="mb-15 m-mb-20">
                                <Icon><img src="./img/icons/icon-facebook.svg"/> </Icon>
                                <Label class="text-body2">Facebook</Label>
                            </Button>
                            <Button on:click={signInWithGoogle} variant="outlined" class="mb-15"><Icon><img src="./img/icons/icon-google.svg"/> </Icon><Label class="text-body2">Google</Label></Button>
                        </div>
                    </Cell>
                </LayoutGrid>
            </div>
        </div>
    </Content>
</Dialog>

<script>
    import Dialog, { Header, Title, Content, Actions } from '@smui/dialog';
    import IconButton from '@smui/icon-button';
    import Button, { Label, Icon } from '@smui/button';
    import LayoutGrid, { Cell } from '@smui/layout-grid';
    import Textfield from '@smui/textfield';
    import HelperText from '@smui/textfield/helper-text/index';
    import {signInWithEmailAndPassword,
        getAuth,
        inMemoryPersistence,
        signInWithPopup,
        GoogleAuthProvider,
        FacebookAuthProvider} from "firebase/auth";
    import authStore from "../../../stores/auth";
    import { createEventDispatcher } from 'svelte';
    export let open;
    export let authModel;
    const dispatch = createEventDispatcher();
    let model = {
        email: '',
        password: '',
    }
    export function openModal(){
        open = true;
    }
    function doSignUp(){
        dispatch('close');
    }

    function closeHandler(e) {
        open = false;
    }

    async function signInWithGoogle() {
        const auth = getAuth();
        try {
            await auth.setPersistence(inMemoryPersistence);
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider).then((result)=>{
                let user = result.user;
                authStore.set({ user });
                authModel = user;
                open = false;
            });
        } catch (error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        }
    }

    async function signInWithFacebook() {
        const auth = getAuth();
        try {
            const provider = new FacebookAuthProvider();
            signInWithPopup(auth, provider).then((result)=>{
                let user = result.user;
                authStore.set({ user });
                authModel = user;
                open = false;
            });
        } catch (error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        }
    }

    async function onSubmit() {
        const auth = getAuth();
        try {
            await auth.setPersistence(inMemoryPersistence);
            const cred = await signInWithEmailAndPassword(auth, model.email, model.password);
            if (cred && cred.user) {
                const token = await cred.user.getIdToken();
                const res = await fetch('/api/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token,
                    }),
                });
                if (res.ok) {
                    const user = await res.json();
                    authStore.set({ user });
                    authModel = user;
                    open = false;
                    return;
                }
                console.error('Error authenticating', res);
            }
        } catch (error) {
            console.error('Error registering', error);
        }
    }
</script>