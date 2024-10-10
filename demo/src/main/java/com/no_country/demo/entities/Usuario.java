package com.no_country.demo.entities;

import com.no_country.demo.entities.enums.EstadoUsuario;
import com.no_country.demo.entities.enums.Rol;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Usuario {

    private String nombre;
    private String apellido;
    private String contraseña;
    private Dni dni;
    private Domicilio domicilio;
    private Email email;
    private Date fechaDeNacimiento;
    private Telefono telefono;
    private Rol rol;
    private EstadoUsuario estadoUsuario;

}
