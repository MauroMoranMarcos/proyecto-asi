package backend.rest.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtGenerator jwtGenerator;

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.cors().and().csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .addFilter(new JwtFilter(authenticationManager(), jwtGenerator))
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/staff/signUp").permitAll()
                .antMatchers(HttpMethod.POST, "/staff/login").permitAll()
                .antMatchers(HttpMethod.POST, "/staff/loginFromServiceToken").permitAll()
                .antMatchers(HttpMethod.POST, "/admin/createWarehouse").permitAll()
                .antMatchers(HttpMethod.GET, "/admin/findAllWarehouses").permitAll()
                .antMatchers(HttpMethod.GET, "/items").permitAll()
                .antMatchers(HttpMethod.POST, "/items/createItem").permitAll()
                .antMatchers(HttpMethod.POST, "/items/checkInventory/*/addItemBoxToWarehouse").permitAll()
                .antMatchers(HttpMethod.GET, "/items/checkInventory").permitAll()
                .antMatchers(HttpMethod.GET, "/items/checkInventory/*").permitAll()
                .antMatchers(HttpMethod.GET, "/items/checkInventory/*/numBoxes").permitAll()
                .antMatchers(HttpMethod.GET, "/items/checkInventory/*/boxes").permitAll()
                .antMatchers(HttpMethod.POST, "/items/checkInventory/*/deleteItem").permitAll()
                .antMatchers(HttpMethod.PUT, "/items/checkInventory/*/modifyItem").permitAll()
                .antMatchers(HttpMethod.PUT, "/items/checkInventory/*/modifyItemBox").permitAll()
                .antMatchers(HttpMethod.PUT, "/items/checkInventory/*/addItemsToBox").permitAll()
                .antMatchers(HttpMethod.PUT, "/items/checkInventory/*/removeItemsFromBox").permitAll()
                .antMatchers(HttpMethod.POST, "/items/checkInventory/*/deleteItemBox").permitAll()
                .antMatchers(HttpMethod.POST, "/items/suppliers/create").permitAll()
                .antMatchers(HttpMethod.GET, "/items/suppliers/findSuppliers").permitAll()
                .antMatchers(HttpMethod.GET, "/items/suppliers/*/findItemsFromSupplier").permitAll()
                .antMatchers(HttpMethod.GET, "/items/suppliers/*").permitAll()
                .antMatchers(HttpMethod.POST, "/orders/createOrder").permitAll()
                .antMatchers(HttpMethod.POST, "/orders/*/addBox").permitAll()
                .antMatchers(HttpMethod.PUT, "/orders/*/boxes/*/updateNumBoxes").permitAll()
                .antMatchers(HttpMethod.POST, "/orders/*/boxes/*/delete").permitAll()
                .antMatchers(HttpMethod.GET, "/orders/*").permitAll()
                .antMatchers(HttpMethod.GET, "/orders/*/boxes").permitAll()
                .antMatchers(HttpMethod.GET, "/orders/findOrderDrafts").permitAll()
                .antMatchers(HttpMethod.POST, "/orders/*/deleteOrder").permitAll()
                .antMatchers(HttpMethod.PUT, "/orders/*/sendOrderToAdmins").permitAll()
                .antMatchers(HttpMethod.GET, "/orders/findOrdersSentToAdmins").permitAll()
                .antMatchers(HttpMethod.PUT, "/orders/*/setOrderDone").permitAll()
                .antMatchers(HttpMethod.GET, "/orders/findOrderHistory").permitAll()
                .antMatchers(HttpMethod.POST, "/orders/*/updateWarehouseStock").permitAll()
                .anyRequest().denyAll();

        //TODO: Add lines here for the rest of the HU
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        config.setAllowCredentials(true);
        config.setAllowedOriginPatterns(Arrays.asList("*"));
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        source.registerCorsConfiguration("/**", config);

        return source;

    }

}
