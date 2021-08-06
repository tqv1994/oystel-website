<div class="content user-dashboard light">
    <div class="container">
        <section class="pt-40 pb-40">
            <div class="section-header">
                <p>Welcome to Your Oysteo Account</p>
                <h1 class="mb-0">Good afternoon, Aureta.</h1>
                <a href="#" class="btn-sign-out text-input">Sign Out</a>
            </div>
            <div class="divider"></div>
            <div class="section-body">
                <LayoutGrid>
                    <Cell spanDevices={{desktop: 3, mobile: 12}}>
                        <TabBar tabs={['Account Details', 'Trips', 'My Advisors', 'Wishlishs', 'Preferences', 'Family & Friends', 'Support']} let:tab bind:active>
                            <!-- Note: the `tab` property is required! -->
                            <Tab {tab}>
                                <Label>{tab}</Label>
                            </Tab>
                        </TabBar>
                    </Cell>
                    <Cell spanDevices={{desktop: 9, mobile: 12}}>

                    </Cell>
                </LayoutGrid>
            </div>
        </section>
    </div>
</div>
<script>
    import Button, { Label, Icon } from '@smui/button';
    import LayoutGrid, { Cell } from '@smui/layout-grid';
    import Tab from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    let active = 'Home';
</script>
<style>
    a.text-input{
        text-decoration: underline;
    }
    .user-dashboard .section-header{
        position: relative;
    }
    .user-dashboard .section-header .btn-sign-out{
        position: absolute;
        right: 0;
        top: 30px;
    }
</style>